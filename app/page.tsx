"use client";

import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppointmentList from "./components/AppointmentList";
import AppointmentForm from "./components/AppointmentForm";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Salon Appointment System</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add Appointment"}
        </button>
        {showForm && <AppointmentForm />}
        <AppointmentList />
      </div>
    </ApolloProvider>
  );
}
