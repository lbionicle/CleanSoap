import os
import base64
import uuid
import uvicorn
import shutil
import pytz

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field
from typing import Annotated, List, Optional

from fastapi.responses import StreamingResponse
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from io import BytesIO
from datetime import datetime

from sqlalchemy import or_, func, desc
from fastapi.staticfiles import StaticFiles
from starlette.responses import JSONResponse, FileResponse

import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

photos_path = "photo_service"
if not os.path.exists(photos_path):
    os.makedirs(photos_path)

class StaticFilesWithCORS(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

app.mount("/photo_service", StaticFilesWithCORS(directory=photos_path), name="photo_service")


models.Base.metadata.create_all(bind=engine)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

admin_token = None


def verify_admin(x_admin_token: Optional[str] = Header(None)):
    if x_admin_token != str(admin_token):
        raise HTTPException(status_code=403, detail="Недействительный токен администратора")


class Authorization(BaseModel):
    email: str
    password: str


class Register(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    password: Optional[str]
    repeat_password: Optional[str]

class Service(BaseModel):
    name: Optional[str]
    price: Optional[int]
    runtime: Optional[float]
    photo: List[Optional[str]] = []

class CreateOrder(BaseModel):
    date: str
    time: str
    payment: str
    services: dict
    address: dict

class OrderStatus(BaseModel):
    request_status: Optional[str]
    order_status: Optional[str]

class OrderPayment(BaseModel):
    payment: Optional[str]

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

def save_photo(photo: List[str], id_service: int) -> dict:
    photo_directory = f'photo_service/{id_service}'

    if not os.path.exists(photo_directory):
        os.makedirs(photo_directory)

    for photo_base64 in photo:
        try:
            if photo_base64.startswith("data:image/"):
                header, photo_data = photo_base64.split(",", 1)
                if "jpeg" in header or "jpg" in header:
                    photo_extension = "jpg"
                elif "png" in header:
                    photo_extension = "png"
                else:
                    photo_extension = "jpg"

                photo_data = base64.b64decode(photo_data)

                unique_filename = f"{uuid.uuid4()}.{photo_extension}"
                photo_path = os.path.join(photo_directory, unique_filename).replace('\\', "/")
                with open(photo_path, "wb") as photo_file:
                    photo_file.write(photo_data)

                return {"path": photo_path}
            else:
                return {"detail": {"errorHeader": "Ошибка добавления фото", "errorMessage": "Неверный формат. Доступен формат: .jpg, .png, .jpeg."}}
        except Exception as e:
            print(f"Error saving photo: {e}")
            return {"detail": {"errorHeader": "Ошибка добавления фото",
                               "errorMessage": "Фото не сохранено."}}


def create_admin(db: Session):
    global admin_token
    email = "admin@admin.com"
    existing_admin = db.query(models.Client).filter(models.Client.email == email).first()
    if not existing_admin:
        admin_user = models.Client(
            first_name="admin",
            last_name="admin",
            phone="375292559257",
            email="admin@admin.com",
            password="adminmaria",
            blocking_status=False,
            superuser_status=True,
            token=uuid.uuid4()
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        admin_token = admin_user.token
    else:
        admin_token = existing_admin.token

@app.get("/photo_service/{id}/{filename}")
async def get_photo(id: int, filename: str):
    file_path = f"photo_service/{id}/{filename}"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type='image/jpeg')
    else:
        raise HTTPException(status_code=404, detail="Файл не найден")


@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    create_admin(db)
    db.close()


@app.post("/register")
async def register(regClient: Register, db: db_dependency):
    if regClient.password != regClient.repeat_password:
        return {"detail": {"errorHeader": "Ошибка регистрации", "errorMessage": "Пароли не совпадают."}}

    existing_client_email = db.query(models.Client).filter(models.Client.email == regClient.email).first()
    existing_client_tel = db.query(models.Client).filter(models.Client.phone == regClient.phone).first()

    if existing_client_email:
        return {"detail": {"errorHeader": "Ошибка регистрации", "errorMessage": "Клиент с данной электронной почтой уже зарегистрирован."}}

    if existing_client_tel:
        return {"detail": {"errorHeader": "Ошибка регистрации", "errorMessage": "Клиент с данным номером телефона уже зарегистрирован."}}

    db_client = models.Client(
        first_name=regClient.first_name,
        last_name=regClient.last_name,
        phone=regClient.phone,
        email=regClient.email,
        password=regClient.password,
        blocking_status=False,
        superuser_status=False,
        token=uuid.uuid4()
    )

    db.add(db_client)
    db.commit()
    db.refresh(db_client)

    return db_client


@app.post("/login")
async def login(auth: Authorization, db: db_dependency):
    existing_client = db.query(models.Client).filter(models.Client.email == auth.email).first()

    if existing_client:
        if not existing_client.blocking_status:
            if existing_client.password == auth.password:
                role = "Admin" if existing_client.token == admin_token else "User"
                return {"token": existing_client.token, "role": role}
            else:
                return {"detail": {"errorHeader": "Ошибка авторизации", "errorMessage": "Неправильный пароль."}}
        else:
            return {"detail": {"errorHeader": "Ошибка авторизации", "errorMessage": "Клиент заблокирован."}}
    else:
        return {"detail": {"errorHeader": "Ошибка авторизации", "errorMessage": "Клиент не найден."}}

@app.get("/clients/{token}")
async def send_info(token: str, db: db_dependency):
    existing_client = db.query(models.Client).filter(models.Client.token == token).first()
    if existing_client:
        return existing_client
    else:
        return {"detail": {"errorHeader": "Ошибка получения данных", "errorMessage": "Клиент не найден."}}


@app.put("/clients/{token}")
async def update_user(token: str, client: Register, db: db_dependency):
    existing_client = db.query(models.Client).filter(models.Client.token == token).first()

    if client.password != client.repeat_password:
        return {"detail": {"errorHeader": "Ошибка изменения данных", "errorMessage": "Пароли не совпадают."}}

    if not existing_client:
        return {"detail": {"errorHeader": "Ошибка получения данных", "errorMessage": "Клиент не найден."}}

    for key, value in client.dict(exclude_unset=True).items():
        if key != "repeat_password":
            setattr(existing_client, key, value)

    db.commit()
    db.refresh(existing_client)

    return {"message": "Данные обновлены"}

@app.get("/clients", dependencies=[Depends(verify_admin)])
async def get_users(db: db_dependency):
    clients = db.query(models.Client).filter(models.Client.superuser_status == False).order_by(desc(models.Client.id_client)).all()
    if len(clients) == 0:
        return {"detail": {"errorHeader": "Ошибка получения данных", "errorMessage": "Список клиентов пуст."}}
    else:
        return clients

@app.delete("/clients/id/{client_id}", dependencies=[Depends(verify_admin)])
async def delete_user(client_id: int, db: db_dependency):
    existing_client = db.query(models.Client).filter(models.Client.id_client == client_id).first()

    if not existing_client:
        return {"detail": {"errorHeader": "Ошибка получения данных", "errorMessage": "Клиент не найден."}}

    db.delete(existing_client)
    db.commit()

    return {"message": "Клиент удалён"}

@app.get("/clients/id/{client_id}", dependencies=[Depends(verify_admin)])
async def delete_user(client_id: int, db: db_dependency):
    existing_client = db.query(models.Client).filter(models.Client.id_client == client_id).first()

    if not existing_client:
        return {"detail": {"errorHeader": "Ошибка получения данных", "errorMessage": "Клиент не найден."}}

    return existing_client


@app.put("/clients/id/{client_id}/{blocking_status}", dependencies=[Depends(verify_admin)])
async def update_user(client_id: int, blocking_status: bool, db: db_dependency):
    existing_client = db.query(models.Client).filter(models.Client.id_client == client_id).first()
    if not existing_client:
        return {"detail": {"errorHeader": "Ошибка получения данных", "errorMessage": "Клиент не найден."}}

    existing_client.blocking_status = blocking_status

    db.commit()
    db.refresh(existing_client)
    return {"message": "Данные обновлены"}

@app.get("/services")
async def get_services(db: db_dependency):
    return db.query(models.CleaningService).order_by(desc(models.CleaningService.id_service)).all()

@app.get("/services/{service_id}")
async def get_services(service_id: int, db: db_dependency):
    existing_service = db.query(models.CleaningService).filter(models.CleaningService.id_service == service_id).first()

    if existing_service:
        return existing_service
    else:
        return {"detail": {"errorHeader": "Ошибка получения данных", "errorMessage": "Услуга не найдена."}}

@app.post("/services", dependencies=[Depends(verify_admin)])
async def create_service(db: db_dependency, service: Service):
    existing_service = db.query(models.CleaningService).filter(models.CleaningService.name == service.name).first()

    try:
        if existing_service:
            return {"detail": {"errorHeader": "Ошибка добавления услуги", "errorMessage": "Данная услуга уже имеется."}}
        else:
            new_service = models.CleaningService(
                name=service.name,
                price=service.price,
                runtime=service.runtime,
                photo=""
            )
            db.add(new_service)
            db.commit()
            db.refresh(new_service)

            try:
                photo_path = save_photo(service.photo, new_service.id_service).get("path")
                new_service.photo = photo_path
                db.commit()
                db.refresh(new_service)
            except Exception as e:
                db.delete(new_service)
                db.commit()
                return {"detail": {"errorHeader": "Ошибка добавления услуги", "errorMessage": "Ошибка добавления фото."}}

            return new_service
    except Exception as e:
        print(f"Error creating office: {e}")
        return {"detail": {"errorHeader": "Ошибка добавления услуги", "errorMessage": "Ошибка добавления услуги."}}

@app.put("/service/{id_service}", dependencies=[Depends(verify_admin)])
async def update_service(id_service: int, service: Service, db: db_dependency):
    existing_service = db.query(models.CleaningService).filter(models.CleaningService.id_service == id_service).first()

    if not existing_service:
        return {"detail": {"errorHeader": "Ошибка изменения услуги", "errorMessage": "Услуга не найдена."}}

    photo_directory = f"photo_service/{id_service}"
    if os.path.exists(photo_directory):
        shutil.rmtree(photo_directory)

    try:
        photo_path = save_photo(service.photo, id_service).get("path")
    except Exception as e:
        return {"detail": {"errorHeader": "Ошибка обновления услуги", "errorMessage": "Ошибка обновления фото."}}

    for key, value in service.dict(exclude_unset=True).items():
        if key != 'photo':
            setattr(existing_service, key, value)

    existing_service.photo = photo_path

    db.commit()
    db.refresh(existing_service)
    return {"message": "Данные обновлены"}


@app.delete("/service/{service_id}", dependencies=[Depends(verify_admin)])
async def delete_office(service_id: int, db: db_dependency):
    existing_service = db.query(models.CleaningService).filter(models.CleaningService.id_service == service_id).first()

    if not existing_service:
        return {"detail": {"errorHeader": "Ошибка удаления услуги", "errorMessage": "Услуга не найдена."}}

    photo_directory = os.path.join("photo_service", str(service_id))

    db.delete(existing_service)
    db.commit()

    if os.path.exists(photo_directory):
        try:
            shutil.rmtree(photo_directory)
        except Exception as e:
            return {"detail": {"errorHeader": "Ошибка удаления услуги", "errorMessage": f"Ошибка при удалении папки с фото: {e}"}}

    return {"message": "Услуга и связанные фото удалены"}


@app.get("/orders/times/{date}")
async def get_times_by_date(date: str, db: db_dependency):
    orders = db.query(models.Order).filter(models.Order.date == date).all()
    times = [order.time for order in orders]
    return times


@app.post("/orders/{token}")
async def create_order(order: CreateOrder, token: str, db: db_dependency):
    if token is None:
        raise HTTPException(status_code=400, detail="Token is required")

    client = db.query(models.Client).filter(models.Client.token == token).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    address_data = order.address
    new_address = models.Address(
        **address_data,
        id_client_address=client.id_client
    )
    db.add(new_address)
    db.commit()
    db.refresh(new_address)

    new_order = models.Order(
        date=order.date,
        time=order.time,
        payment=order.payment,
        request_status="В рассмотрении",
        order_status="В процессе",
        services=order.services,
        id_client_order=client.id_client,
        id_address_order=new_address.id_address
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order


@app.get("/orders/user/{token}")
async def get_user_orders(token: str, db: db_dependency):
    client = db.query(models.Client).filter(models.Client.token == token).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    orders = db.query(models.Order).filter(models.Order.id_client_order == client.id_client).all()
    return orders


@app.get("/orders")
async def get_orders(db: Session = Depends(get_db)):
    orders = db.query(
        models.Order,
        models.Client.phone,
        models.Address.street,
        models.Address.house_number
    ).join(
        models.Client, models.Order.id_client_order == models.Client.id_client
    ).join(
        models.Address, models.Address.id_address == models.Order.id_address_order
    ).order_by(
        desc(models.Order.id_order)
    ).all()

    result = []
    for order, phone, street, house_number in orders:
        result.append({
            "id_order": order.id_order,
            "date": order.date,
            "payment": order.payment,
            "order_status": order.order_status,
            "id_address_order": order.id_address_order,
            "id_client_order": order.id_client_order,
            "time": order.time,
            "request_status": order.request_status,
            "services": order.services,
            "phone": phone,
            "street": street,
            "house_number": house_number
        })

    return result



@app.delete("/orders/{order_id}")
async def delete_order(order_id: int, db: db_dependency):

    order = db.query(models.Order).filter(models.Order.id_order == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()
    return {"message": "Order deleted"}


@app.put("/orders/{order_id}/payment")
async def update_order_payment(order_id: int, orderPayment: OrderPayment, db: db_dependency):
    order = db.query(models.Order).filter(models.Order.id_order == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.payment = orderPayment.payment
    db.commit()
    db.refresh(order)
    return order


@app.put("/orders/{order_id}/status", dependencies=[Depends(verify_admin)])
async def update_order_status(order_id: int, db: db_dependency, status: OrderStatus):
    order = db.query(models.Order).filter(models.Order.id_order == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if status.request_status:
        order.request_status = status.request_status
    if status.order_status:
        order.order_status = status.order_status

    db.commit()
    db.refresh(order)
    return order


@app.get("/report", dependencies=[Depends(verify_admin)])
async def generate_report(db: db_dependency):
    buffer = BytesIO()

    pdfmetrics.registerFont(TTFont('Times-Roman', 'times.ttf'))
    pdfmetrics.registerFont(TTFont('Times-Roman-Bold', 'times-bold.ttf'))
    pdfmetrics.registerFont(TTFont('Times-Roman-Italic', 'times-italic.ttf'))

    pdf = SimpleDocTemplate(buffer, pagesize=A4, topMargin=20)
    elements = []

    orders = db.query(models.Order).all()
    total_income = 0
    for order in orders:
        for service_name, service_data in order.services.items():
            service = db.query(models.CleaningService).filter(models.CleaningService.name == service_name).first()
            if service:
                total_income += service_data['value'] * service.price

    total_clients = db.query(models.Client).filter(models.Client.superuser_status == False).count()
    total_orders = db.query(models.Order).count()
    processed_orders = db.query(models.Order).filter(models.Order.request_status.in_(["Одобрена", "Не одобрена"])).count()

    service_counts = db.query(models.Order.services).all()
    service_counter = {}
    for service in service_counts:
        for key in service.services:
            if key in service_counter:
                service_counter[key] += 1
            else:
                service_counter[key] = 1

    if service_counter:
        frequently_ordered_service = max(service_counter, key=service_counter.get)
        service_count = service_counter[frequently_ordered_service]
    else:
        frequently_ordered_service = "Нет данных"
        service_count = 0

    avg_check = total_income / total_orders if total_orders > 0 else 0

    services = db.query(models.CleaningService).all()

    title = "ОТЧЕТ О ТЕКУЩЕЙ ДЕЯТЕЛЬНОСТИ КОМПАНИИ"
    subtitle = f"на период времени {datetime.now().astimezone(pytz.timezone('Europe/Minsk')).strftime('%d.%m.%Y')}."

    elements.append(
        Paragraph(title, ParagraphStyle('title', alignment=TA_CENTER, fontName='Times-Roman-Bold', fontSize=14, leading=20)))
    elements.append(Spacer(1, 10))
    elements.append(Paragraph(subtitle,
                              ParagraphStyle('subtitle', alignment=TA_CENTER, fontName='Times-Roman', fontSize=12,
                                             leading=20)))
    elements.append(Spacer(1, 20))

    org_info = [
        ["Организация OOO «Clean Soap ECommerce»."],
        [f"Доходы организации за оказанные услуги (бел. руб.): {total_income}."],
        [f"Общее количество клиентов организации (шт.): {total_clients}."]
    ]
    org_table = Table(org_info, colWidths=[160 * mm])
    org_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('LEADING', (0, 0), (-1, -1), 14),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
    ]))
    elements.append(org_table)
    elements.append(Spacer(1, 20))

    elements.append(Paragraph("Статистические данные о заявках",
                              ParagraphStyle('heading', alignment=TA_CENTER, fontName='Times-Roman', fontSize=12, leading=20,
                                             textColor=colors.black)))
    elements.append(Spacer(1, 20))

    elements.append(Paragraph("Обзор поступивших и обработанных заявок",
                              ParagraphStyle('subheading', alignment=TA_LEFT, fontName='Times-Roman-Italic', fontSize=10, leading=15,
                                             textColor=colors.black)))
    order_stats = [
        ["Количество поступивших заявок (шт.)", f"{total_orders}"],
        ["Количество обработанных заявок (шт.)", f"{processed_orders}"]
    ]
    order_table = Table(order_stats, colWidths=[77.5 * mm, 77.5 * mm])
    order_table.setStyle(TableStyle(
        [('BACKGROUND', (0, 0), (-1, 0), colors.white), ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
         ('ALIGN', (0, 0), (0, -1), 'LEFT'), ('VALIGN', (0, 0), (0, -1), 'MIDDLE'), ('ALIGN', (1, 0), (1, -1), 'CENTER'), ('VALIGN', (1, 0), (1, -1), 'MIDDLE'),
         ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
         ('BOTTOMPADDING', (0, 0), (-1, 0), 12), ('BACKGROUND', (0, 1), (-1, -1), colors.white),
         ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(order_table)
    elements.append(Spacer(1, 20))

    elements.append(Paragraph("Заявки и ключевые показатели",
                              ParagraphStyle('subheading', alignment=TA_LEFT, fontName='Times-Roman-Italic', fontSize=10, leading=15,
                                             textColor=colors.black)))
    key_indicators = [
        ["Часто заказываемая услуга", frequently_ordered_service],
        ["Объем по услугам (шт.)", service_count],
        ["Средний чек (бел. руб.)", f"{avg_check:.2f}"]
    ]
    indicators_table = Table(key_indicators, colWidths=[77.5 * mm, 77.5 * mm])
    indicators_table.setStyle(TableStyle(
        [('BACKGROUND', (0, 0), (-1, 0), colors.white), ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
         ('ALIGN', (0, 0), (0, -1), 'LEFT'), ('VALIGN', (0, 0), (0, -1), 'MIDDLE'), ('ALIGN', (1, 0), (1, -1), 'CENTER'), ('VALIGN', (1, 0), (1, -1), 'MIDDLE'),
         ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
         ('BOTTOMPADDING', (0, 0), (-1, 0), 12), ('BACKGROUND', (0, 1), (-1, -1), colors.white),
         ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(indicators_table)
    elements.append(Spacer(1, 30))

    elements.append(Paragraph("Статистические данные о клининговых услугах",
                              ParagraphStyle('heading', fontName='Times-Roman', alignment=TA_CENTER, fontSize=12, leading=20,
                                             textColor=colors.black)))
    elements.append(Spacer(1, 20))
    elements.append(Paragraph("Тарификатор цен",
                              ParagraphStyle('subheading', alignment=TA_LEFT, fontName='Times-Roman-Italic', fontSize=10, leading=5,
                                             textColor=colors.black)))
    elements.append(Spacer(1, 10))

    services_data = [["Название услуги", "Площадь (м2)", "Время выполнения\n(мин.)", "Цена (бел. руб.)"]]
    for service in services:
        services_data.append([service.name, "1", service.runtime, service.price])

    services_table = Table(services_data, colWidths=[60 * mm, 30 * mm, 35 * mm, 30 * mm])
    services_table.setStyle(TableStyle(
        [('BACKGROUND', (0, 0), (-1, 0), colors.white), ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
         ('ALIGN', (0, 0), (0, -1), 'LEFT'), ('ALIGN', (1, 0), (-1, -1), 'CENTER'), ('VALIGN', (1, 0), (-1, -1), 'MIDDLE'), ('VALIGN', (0, 0), (-1, 0), 'TOP'),
         ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'), ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
         ('BACKGROUND', (0, 1), (-1, -1), colors.white), ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(services_table)

    pdf.build(elements)

    buffer.seek(0)
    return StreamingResponse(buffer, media_type='application/pdf',
                             headers={"Content-Disposition": "attachment; filename=CLEAN-SOAP-REPORT.pdf"})

@app.get("/role/{token}")
async def get_role(db: db_dependency, token: str):
    existing_client = db.query(models.Client).filter(models.Client.token == token).first()

    if existing_client.superuser_status:
        return "Admin"
    else:
        return "User"



if __name__ == '__main__':
    uvicorn.run("main:app", port=1480, host="0.0.0.0", reload=True)
