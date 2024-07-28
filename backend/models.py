from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from database import Base

class Client(Base):
    __tablename__ = "client"
    id_client = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), index=True)
    last_name = Column(String(255), index=True)
    phone = Column(String(255), index=True)
    email = Column(String(255), index=True)
    password = Column(String(255), index=True)
    blocking_status = Column(Boolean, default=False, index=True)
    superuser_status = Column(Boolean, default=False, index=True)
    token = Column(String(255), index=True)
    addresses = relationship("Address", backref="client", cascade="all, delete", passive_deletes=True)
    orders = relationship("Order", backref="client", cascade="all, delete", passive_deletes=True)

class Address(Base):
    __tablename__ = "address"
    id_address = Column(Integer, primary_key=True, index=True)
    street = Column(String(255), index=True)
    house_number = Column(Integer, index=True)
    apartment_number = Column(Integer, index=True)
    corps_number = Column(Integer, index=True)
    entrance_number = Column(Integer, index=True)
    floor_number = Column(Integer, index=True)
    id_client_address = Column(Integer, ForeignKey("client.id_client", ondelete="CASCADE"), index=True)
    orders = relationship("Order", backref="order_address", cascade="all, delete", passive_deletes=True)

class CleaningService(Base):
    __tablename__ = "cleaning_services"
    id_service = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    price = Column(Integer, index=True)
    runtime = Column(Float, index=True)
    photo = Column(String(255), index=True)

class Order(Base):
    __tablename__ = "orders"
    id_order = Column(Integer, primary_key=True, index=True)
    id_client_order = Column(Integer, ForeignKey("client.id_client", ondelete="CASCADE"), index=True)
    id_address_order = Column(Integer, ForeignKey("address.id_address", ondelete="CASCADE"), index=True)
    date = Column(String(255), index=True)
    time = Column(String(255), index=True)
    payment = Column(String(255), index=True)
    request_status = Column(String(255), index=True)
    order_status = Column(String(255), index=True)
    services = Column(JSONB, index=True)
