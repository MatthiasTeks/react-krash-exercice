import List from "@/components/common/List";
import { getPersonById, getPersonByName } from "@/lib/features/people/peopleAction";
import { Film } from "@/types/film";
import { Species } from "@/types/species";
import { Starship } from "@/types/starship";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";

export default async function Person({ params }: { params: { search: string } }) {
  const { search } = params;

  let response;

  if (!isNaN(Number(search))) {
    response = await getPersonById(search);
  } else {
    response = await getPersonByName(search);
  }

  const person = response?.name ? response : null;

  if (!person) return null;

  return (
    <div className="mx-auto p-6">
      {/* Person Name */}
      <h1 className="text-4xl font-semibold mb-4 text-gray-800">
        {person.name} <span className="text-lg text-gray-500">({person.gender})</span>
      </h1>

      {/* Birth Year, Height, Mass */}
      <div className="flex justify-between mb-6 text-sm text-gray-600">
        <div>
          <p>
            Birth Year: <span className="text-gray-800">{person.birth_year}</span>
          </p>
          <p>
            Height: <span className="text-gray-800">{person.height} cm</span>
          </p>
          <p>
            Mass: <span className="text-gray-800">{person.mass} kg</span>
          </p>
        </div>
        <div>
          <p>
            Eye Color: <span className="text-gray-800">{person.eye_color}</span>
          </p>
          <p>
            Hair Color: <span className="text-gray-800">{person.hair_color}</span>
          </p>
          <p>
            Skin Color: <span className="text-gray-800">{person.skin_color}</span>
          </p>
        </div>
      </div>

      {/* Lists of related entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Films */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Films</h2>
          {person.films.length > 0 ? (
            <List>
              {person.films.map((film: Film) => (
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

        {/* Species */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Species</h2>
          {person.species.length > 0 ? (
            <List>
              {person.species.map((species: Species) => (
                <li key={species.url}>
                  <Link href={`/species/${species.name}`} className="hover:text-blue-500">
                    {species.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No species data available.</p>
          )}
        </div>

        {/* Starships */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Starships</h2>
          {person.starships.length > 0 ? (
            <List>
              {person.starships.map((starship: Starship) => (
                <li key={starship.url}>
                  <Link href={`/starships/${starship.name}`} className="hover:text-blue-500">
                    {starship.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No starship data available.</p>
          )}
        </div>

        {/* Vehicles */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Vehicles</h2>
          {person.vehicles.length > 0 ? (
            <List>
              {person.vehicles.map((vehicle: Vehicle) => (
                <li key={vehicle.url}>
                  <Link href={`/vehicles/${vehicle.name}`} className="hover:text-blue-500">
                    {vehicle.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No vehicle data available.</p>
          )}
        </div>

        {/* Homeworld */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Homeworld</h2>
          {person.homeworld ? (
            <Link href={`/planets/${person.homeworld.name}`} className="hover:text-blue-500">
              {person.homeworld.name}
            </Link>
          ) : (
            <p className="text-gray-500">No homeworld data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
