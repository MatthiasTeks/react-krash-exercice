import List from "@/components/common/List";
import { getPlanetById, getPlanetByName } from "@/lib/features/planet/planetAction";
import { Film } from "@/types/film";
import { People } from "@/types/people";
import Link from "next/link";

export default async function Planet({ params }: { params: { search: string } }) {
  const { search } = params;

  let response;

  if (!isNaN(Number(search))) {
    response = await getPlanetById(search);
  } else {
    response = await getPlanetByName(search);
  }

  const planet = response?.name ? response : null;

  if (!planet) return null;

  return (
    <div className="mx-auto p-6">
      {/* Planet Name */}
      <h1 className="text-4xl font-semibold mb-4 text-gray-800">{planet.name}</h1>

      {/* Basic Information */}
      <div className="flex justify-between mb-6 text-sm text-gray-600">
        <div>
          <p>
            Diameter: <span className="text-gray-800">{planet.diameter} km</span>
          </p>
          <p>
            Gravity: <span className="text-gray-800">{planet.gravity}</span>
          </p>
          <p>
            Climate: <span className="text-gray-800">{planet.climate}</span>
          </p>
        </div>
        <div>
          <p>
            Terrain: <span className="text-gray-800">{planet.terrain}</span>
          </p>
          <p>
            Surface Water: <span className="text-gray-800">{planet.surface_water}%</span>
          </p>
          <p>
            Population: <span className="text-gray-800">{planet.population}</span>
          </p>
        </div>
      </div>

      {/* Lists of related entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Residents */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Residents</h2>
          {planet.residents.length > 0 ? (
            <List>
              {planet.residents.map((resident: People) => (
                <li key={resident.url}>
                  <Link href={`/people/${resident.name}`} className="hover:text-blue-500">
                    {resident.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No residents data available.</p>
          )}
        </div>

        {/* Films */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Films</h2>
          {planet.films.length > 0 ? (
            <List>
              {planet.films.map((film: Film) => (
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
