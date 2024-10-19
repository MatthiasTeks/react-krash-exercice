import List from "@/components/common/List";
import { getSpeciesById, getSpeciesByName } from "@/lib/features/species/speciesAction";
import { Film } from "@/types/film";
import { People } from "@/types/people";
import { Planet } from "@/types/planet";
import Link from "next/link";

async function fetchHomeworld(homeworldUrl: string): Promise<Planet | null> {
  try {
    const response = await fetch(homeworldUrl);
    if (!response.ok) throw new Error("Failed to fetch homeworld");
    const homeworld = await response.json();
    return homeworld;
  } catch (error) {
    console.error("Error fetching homeworld:", error);
    return null;
  }
}

export default async function Species({ params }: { params: { search: string } }) {
  const { search } = params;

  let response;

  if (!isNaN(Number(search))) {
    response = await getSpeciesById(search);
  } else {
    response = await getSpeciesByName(search);
  }

  const species = response?.name ? response : null;

  if (!species) return null;

  let homeworldName = null;
  if (species.homeworld) {
    const homeworld = await fetchHomeworld(species.homeworld);
    homeworldName = homeworld?.name || null;
  }

  return (
    <div className="mx-auto p-6">
      {/* Species Name */}
      <h1 className="text-4xl font-semibold mb-4 text-gray-800">{species.name}</h1>

      {/* Basic Information */}
      <div className="flex justify-between mb-6 text-sm text-gray-600">
        <div>
          <p>
            Classification: <span className="text-gray-800">{species.classification}</span>
          </p>
          <p>
            Designation: <span className="text-gray-800">{species.designation}</span>
          </p>
          <p>
            Average Height: <span className="text-gray-800">{species.average_height} cm</span>
          </p>
        </div>
        <div>
          <p>
            Average Lifespan: <span className="text-gray-800">{species.average_lifespan} years</span>
          </p>
          <p>
            Eye Colors: <span className="text-gray-800">{species.eye_colors}</span>
          </p>
          <p>
            Hair Colors: <span className="text-gray-800">{species.hair_colors}</span>
          </p>
          <p>
            Skin Colors: <span className="text-gray-800">{species.skin_colors}</span>
          </p>
        </div>
      </div>

      {/* Language and Homeworld */}
      <div className="mb-6">
        <p>
          Language: <span className="text-gray-800">{species.language}</span>
        </p>
        {species.homeworld && (
          <p>
            Homeworld:{" "}
            <Link href={`/planets/${homeworldName}`} className="text-blue-500 hover:underline">
              View Homeworld
            </Link>
          </p>
        )}
      </div>

      {/* Lists of related entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* People */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">People</h2>
          {species.people.length > 0 ? (
            <List>
              {species.people.map((person: People) => (
                <li key={person.url}>
                  <Link href={`/people/${person.name}`} className="hover:text-blue-500">
                    {person.name}
                  </Link>
                </li>
              ))}
            </List>
          ) : (
            <p className="text-gray-500">No people data available.</p>
          )}
        </div>

        {/* Films */}
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Films</h2>
          {species.films.length > 0 ? (
            <List>
              {species.films.map((film: Film) => (
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
