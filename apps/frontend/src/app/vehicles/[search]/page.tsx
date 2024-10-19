import List from "@/components/common/List";
import { getVehicleById, getVehicleByName } from "@/lib/features/vehicle/vehicleAction";
import { Film } from "@/types/film";
import { People } from "@/types/people";
import Link from "next/link";

export default async function Vehicle({ params }: { params: { search: string } }) {
  const { search } = params;

  let response;

  if (!isNaN(Number(search))) {
    response = await getVehicleById(search);
  } else {
    response = await getVehicleByName(search);
  }

  const vehicle = response?.name ? response : null;

  if (!vehicle) return null;

  return (
    <div className="mx-auto p-6">
      {/* Vehicle Name */}
      <h1 className="text-4xl font-semibold mb-4 text-gray-800">{vehicle.name}</h1>

      {/* Basic Information */}
      <div className="flex justify-between mb-6 text-sm text-gray-600">
        <div>
          <p>
            Model: <span className="text-gray-800">{vehicle.model}</span>
          </p>
          <p>
            Vehicle Class: <span className="text-gray-800">{vehicle.vehicle_class}</span>
          </p>
          <p>
            Manufacturer: <span className="text-gray-800">{vehicle.manufacturer}</span>
          </p>
          <p>
            Cost in Credits:{" "}
            <span className="text-gray-800">{vehicle.cost_in_credits ? vehicle.cost_in_credits : "Unknown"}</span>
          </p>
        </div>
        <div>
          <p>
            Length: <span className="text-gray-800">{vehicle.length} meters</span>
          </p>
          <p>
            Crew: <span className="text-gray-800">{vehicle.crew}</span>
          </p>
          <p>
            Passengers: <span className="text-gray-800">{vehicle.passengers}</span>
          </p>
          <p>
            Max Atmosphering Speed:{" "}
            <span className="text-gray-800">
              {vehicle.max_atmosphering_speed !== "n/a" ? vehicle.max_atmosphering_speed : "Not applicable"}
            </span>
          </p>
        </div>
      </div>

      {/* Cargo Capacity & Consumables */}
      <div className="mb-6">
        <p>
          Cargo Capacity: <span className="text-gray-800">{vehicle.cargo_capacity}</span>
        </p>
        <p>
          Consumables: <span className="text-gray-800">{vehicle.consumables}</span>
        </p>
      </div>

      {/* Lists of related entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pilots */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Pilots</h2>
          {vehicle.pilots.length > 0 ? (
            <List>
              {vehicle.pilots.map((pilot: People) => (
                <li key={pilot.url}>
                  <Link href={`/people/${pilot.name}`} className="hover:text-blue-500">
                    {pilot.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No pilots data available.</p>
          )}
        </div>

        {/* Films */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Films</h2>
          {vehicle.films.length > 0 ? (
            <List>
              {vehicle.films.map((film: Film) => (
                <li key={film.url}>
                  <Link href={`/films/${film.title}`} className="hover:text-blue-500">
                    {film.title}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No film data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
