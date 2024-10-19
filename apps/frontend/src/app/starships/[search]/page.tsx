import List from "@/components/common/List";
import { getStarshipById, getStarshipByName } from "@/lib/features/starship/startshipAction";
import { Film } from "@/types/film";
import { People } from "@/types/people";
import Link from "next/link";

export default async function Starship({ params }: { params: { search: string } }) {
  const { search } = params;

  let response;

  if (!isNaN(Number(search))) {
    response = await getStarshipById(search);
  } else {
    response = await getStarshipByName(search);
  }

  const starship = response?.name ? response : null;

  if (!starship) return null;

  return (
    <div className="mx-auto p-6">
      {/* Starship Name */}
      <h1 className="text-4xl font-semibold mb-4 text-gray-800">{starship.name}</h1>

      {/* Basic Information */}
      <div className="flex justify-between mb-6 text-sm text-gray-600">
        <div>
          <p>
            Model: <span className="text-gray-800">{starship.model}</span>
          </p>
          <p>
            Starship Class: <span className="text-gray-800">{starship.starship_class}</span>
          </p>
          <p>
            Manufacturer: <span className="text-gray-800">{starship.manufacturer}</span>
          </p>
          <p>
            Cost in Credits:{" "}
            <span className="text-gray-800">{starship.cost_in_credits ? starship.cost_in_credits : "Unknown"}</span>
          </p>
        </div>
        <div>
          <p>
            Length: <span className="text-gray-800">{starship.length} meters</span>
          </p>
          <p>
            Crew: <span className="text-gray-800">{starship.crew}</span>
          </p>
          <p>
            Passengers: <span className="text-gray-800">{starship.passengers}</span>
          </p>
          <p>
            Max Atmosphering Speed:{" "}
            <span className="text-gray-800">
              {starship.max_atmosphering_speed !== "n/a" ? starship.max_atmosphering_speed : "Not applicable"}
            </span>
          </p>
        </div>
      </div>

      {/* Hyperdrive & Other Details */}
      <div className="mb-6">
        <p>
          Hyperdrive Rating: <span className="text-gray-800">{starship.hyperdrive_rating}</span>
        </p>
        <p>
          MGLT: <span className="text-gray-800">{starship.MGLT}</span>
        </p>
        <p>
          Cargo Capacity: <span className="text-gray-800">{starship.cargo_capacity}</span>
        </p>
        <p>
          Consumables: <span className="text-gray-800">{starship.consumables}</span>
        </p>
      </div>

      {/* Lists of related entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pilots */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Pilots</h2>
          {starship.pilots.length > 0 ? (
            <List>
              {starship.pilots.map((pilot: People) => (
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
          {starship.films.length > 0 ? (
            <List>
              {starship.films.map((film: Film) => (
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
