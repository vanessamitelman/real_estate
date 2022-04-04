import { Flex, Box} from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';
import Banner from '../components/Banner';


export default function Home({ propertiesForSale, propertiesForRent }) {
  const imgPrefix = 'https://bayut-production.s3.eu-central-1.amazonaws.com/image'
  return (
    <Box>
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl={`${imgPrefix}/145426814/33973352624c48628e41f2ec460faba4`}
      />
      <Flex flexWrap='wrap' justifyContent="center">
        {propertiesForRent?.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
      <Banner
        purpose='BUY A HOME'
        title1='Find, Buy & Own Your'
        title2='Dream Home'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl={`${imgPrefix}/110993385/6a070e8e1bae4f7d8c1429bc303d2008`}
      />
      <Flex flexWrap='wrap' justifyContent='center'>
        {propertiesForSale?.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const urlPrefix = '/properties/list?locationExternalIDs=5002&purpose='
  const urlSuffix = '&hitsPerPage=6'
  const propertyForSale = await fetchApi(
    `${baseUrl}${urlPrefix}for-sale${urlSuffix}`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}${urlPrefix}for-rent${urlSuffix}`
  );
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits
    }
  };
}
