import { useQuery, gql } from "@apollo/client";

const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      customerName
      appointmentTime
      salon {
        name
      }
      service {
        name
      }
    }
  }
`;

export default function AppointmentList() {
  const { loading, error, data } = useQuery(GET_APPOINTMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <ul>
        {data.appointments.map((appointment: any) => (
          <li key={appointment.id} className="mb-4 p-4 border rounded">
            <p>
              <strong>Customer:</strong> {appointment.customerName}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(appointment.appointmentTime).toLocaleString()}
            </p>
            <p>
              <strong>Salon:</strong> {appointment.salon.name}
            </p>
            <p>
              <strong>Service:</strong> {appointment.service.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
