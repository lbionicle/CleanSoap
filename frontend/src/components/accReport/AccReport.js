import useServices from "../../services/Service";
import { saveAs } from "file-saver";

const AccReport = () => {

    const {exportReport} = useServices();

    const handleClick = async () => {
        try {
            const blob = await exportReport();
            saveAs(blob, 'report.pdf');
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    }

    return (
        <div className="d-flex flex-column justify-conttent-center align-items-center text-start col-12 col-lg-8 col-xxl-4 text-center ms-xxl-5">
            <div className="col-12 fs-3" style={{fontWeight: 600}}>Генерация отчетов</div>
            <div className="col-12 fs-5" style={{margin: "2.5rem 0"}}>Создать отчет о часто заказываемых услугах <i onClick={handleClick} style={{cursor: "pointer"}} class="bi fa-lg bi-plus-circle"></i></div>
        </div>
    )
}

export default AccReport;