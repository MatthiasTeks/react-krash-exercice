import List from "@/components/common/List";
import { getFilmById, getFilmByTitle } from "@/lib/features/film/filmAction";
import { People } from "@/types/people";
import { Planet } from "@/types/planet";
import { Species } from "@/types/species";
import { Starship } from "@/types/starship";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";

export default async function Film({ params }: { params: { search: string } }) {
  const { search } = params;

  let response;

  if (!isNaN(Number(search))) {
    response = await getFilmById(search);
  } else {
    response = await getFilmByTitle(search);
  }

  const film = response?.title ? response : null;

  if (!film) return null;

  return (
    <div className="mx-auto p-6">
      {/* Film Title */}
      <h1 className="text-4xl font-semibold mb-4 text-gray-800">
        {film.title} <span className="text-lg text-gray-500">Episode {film.episode_id}</span>
      </h1>

      {/* Director, Producer, Release Date */}
      <div className="flex justify-between mb-6 text-sm text-gray-600">
        <div>
          <p>
            Directed by: <span className="text-gray-800">{film.director}</span>
          </p>
          <p>
            Produced by: <span className="text-gray-800">{film.producer}</span>
          </p>
        </div>
        <div>
          <p>
            Release Date: <span className="text-gray-800">{new Date(film.release_date).toDateString()}</span>
          </p>
        </div>
      </div>

      {/* Opening Crawl */}
      <div className="mb-6">
        <p className="text-gray-700 italic">{film.opening_crawl}</p>
      </div>

      {/* Lists of related entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Species */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Species</h2>
          {film.species.length > 0 ? (
            <List>
              {film.species.map((species: Species) => (
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

        {/* Characters */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Characters</h2>
          {film.characters.length > 0 ? (
            <List>
              {film.characters.map((character: People) => (
                <li key={character.url}>
                  <Link href={`/people/${character.name}`} className="hover:text-blue-500">
                    {character.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No characters data available.</p>
          )}
        </div>

        {/* Starships */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Starships</h2>
          {film.starships.length > 0 ? (
            <List>
              {film.starships.map((starship: Starship) => (
                <li key={starship.url}>
                  <Link href={`/starships/${starship.name}`} className="hover:text-blue-500">
                    {starship.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No starships data available.</p>
          )}
        </div>

        {/* Vehicles */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Vehicles</h2>
          {film.vehicles.length > 0 ? (
            <List>
              {film.vehicles.map((vehicle: Vehicle) => (
                <li key={vehicle.url}>
                  <Link href={`/vehicles/${vehicle.name}`} className="hover:text-blue-500">
                    {vehicle.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No vehicles data available.</p>
          )}
        </div>

        {/* Planets */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Planets</h2>
          {film.planets.length > 0 ? (
            <List>
              {film.planets.map((planet: Planet) => (
                <li key={planet.url}>
                  <Link href={`/planets/${planet.name}`} className="hover:text-blue-500">
                    {planet.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No planets data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
