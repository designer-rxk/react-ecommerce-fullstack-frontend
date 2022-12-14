import Head from "next/head";
import { PRODUCT_QUERY } from "../lib/query";
import { useQuery } from "urql";
import Product from "../components/Product";
import { Gallery } from "../styles/Gallery";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
    //Fetch products from strapi
    const [results] = useQuery({ query: PRODUCT_QUERY });
    const { data, fetching, error } = results;

    //Checks for the data coming in
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    const products = data.products.data;

    return (
        <div>
            <Head>
                <title>Styled. | Homepage</title>
            </Head>

            <main>
                <Gallery>
                    {fetching && <Skeleton />}
                    {products.map((product) => (
                        <Product key={product.attributes.slug} product={product} />
                    ))}
                </Gallery>
            </main>
        </div>
    );
}
