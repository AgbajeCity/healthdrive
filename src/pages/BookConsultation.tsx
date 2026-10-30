import NotAvailableNotice from "@/components/NotAvailableNotice";

const BookConsultation = () => (
  <NotAvailableNotice
    title="Consultations"
    notice="Consultations are not available yet. HealthDrive has no operating clinic or telehealth service."
    path="/book-consultation"
  />
);

export default BookConsultation;
