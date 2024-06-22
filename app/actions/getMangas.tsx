"use server"

export async function getMangas(page:number, perPage: number) {

  const query = `
    query ($page: Int, $perPage: Int) {
      Page (page: $page, perPage: $perPage) {
        media(type: ANIME) {
          id
          title {
            romaji
            english
          }
          genres
          chapters
          episodes
          bannerImage
          coverImage {
            large
            extraLarge
          }
          averageScore
          externalLinks {
            site
            url          
          }
        }
      }
    }
  `;

  const variables = {
    page,
    perPage
  };

  const url = 'https://graphql.anilist.co';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      return data.data.Page.media; // Assuming your data structure from AniList
    } else {
      throw new Error(`Failed to fetch mangas: ${data.errors}`);
    }
  } catch (error) {
    console.error('Error fetching mangas:', error);
    throw error; // Rethrow the error to handle it in the calling component
  }
}