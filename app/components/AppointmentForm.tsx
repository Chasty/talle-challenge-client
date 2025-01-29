import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(createAppointmentInput: $input) {
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

const GET_SALONS = gql`
  query {
    getSalons {
      id
      name
    }
  }
`;

const GET_SERVICES = gql`
  query {
    services {
      id
      name
    }
  }
`;

export default function AppointmentForm() {
  const [customerName, setCustomerName] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [salonId, setSalonId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: salonData } = useQuery(GET_SALONS);
  const { data: serviceData } = useQuery(GET_SERVICES);

  const [createAppointment, { loading }] = useMutation(CREATE_APPOINTMENT, {
    refetchQueries: ["GetAppointments"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAppointment({
      variables: {
        input: {
          customerName,
          appointmentTime,
          salonId: Number.parseInt(salonId),
          serviceId: Number.parseInt(serviceId),
        },
      },
    })
      .then(() => {
        setCustomerName("");
        setAppointmentTime("");
        setSalonId("");
        setServiceId("");
        setSuccessMessage("Appointment created successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Appointment Time:</label>
        <input
          type="datetime-local"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Salon:</label>
        <select
          value={salonId}
          onChange={(e) => setSalonId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a salon</option>
          {salonData?.getSalons.map((salon: any) => (
            <option key={salon.id} value={salon.id}>
              {salon.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Service:</label>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a service</option>
          {serviceData?.services.map((service: any) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Appointment"}
      </button>
    </form>
  );
}
