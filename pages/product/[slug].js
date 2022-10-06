import {useQuery} from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {DetailStyle, ProductInfo, Quantity, Buy} from "../../styles/ProductDetails";
import {AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai";
import {useStateContext} from "../../lib/context";
import Head from "next/head";
import toast from "react-hot-toast";

export default function ProductDetails(){
    const { query } = useRouter();
    const { qty, increaseQty, decreaseQty, onAdd } = useStateContext();

    // Fetch GraphQL data
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug: query.slug},
    });
    const {data, fetching, error} = results;

    // Check
    if(fetching) return <p>Loading...</p>;
    if(error) return <p>Oh no...{error.message}</p>;

    // Extract the data
    const {title, description, image} = data.products.data[0].attributes;

    //Create Toast
    const notify = () => {
        toast.success(`${title} added to your cart.`, {
            duration: 1500,
        });
    };


    return(
        <DetailStyle>
            <Head>
                <title>Styled. | {title}</title>
            </Head>

            <img src={image.data.attributes.formats.medium.url} alt={title}/>
            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>
                <Quantity>

                <span>Quantity</span>
                <button onClick={decreaseQty}><AiFillMinusCircle/></button>
                <p>{qty}</p>
                <button onClick={increaseQty}><AiFillPlusCircle/></button>

                </Quantity>
                <Buy onClick={() => onAdd( data.products.data[0].attributes,qty ) & notify()}>Add to Cart</Buy>
            </ProductInfo>

        </DetailStyle>
    )
}