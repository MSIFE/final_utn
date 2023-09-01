import { useState, useEffect } from 'react';
import axios from 'axios';
import GalleryItem from '../components/gallery/GalleryItem';

import '../style/components/layout/Layout.css';

const Products = (props) => {

    const [loading, setLoading] = useState(false);
    const [gallery, setGallery] = useState([]);

    useEffect(() =>{
        const cargarGallery = async () =>{
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/gallery');
            setGallery(response.data);
            setLoading(false);
        };

        cargarGallery();
    }, [])
 

    return(
        <>
        <h2>Galeria</h2>
        {
            loading ? (
                <p>Cargando...</p>
            ):(
                gallery.map(item => <GalleryItem key={item.id_pro}
                    titulo={item.titulo} info={item.info}
                    imagen={item.imagen}  body={item.body} 
                    precio={item.prercio}
                    />)
            )
        }

 {/*  <section id="nuestros-programas">
        <div className="container">
            <h2>Nuestros Programas</h2>
            <div className="programas">
                <div className="carta">
                    <h3></h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero corporis incidunt saepe qui commodi quasi neque veniam quam, aspernatur est beatae maxime animi sed reiciendis mollitia ducimus veritatis repellendus?</p>
                    <button>+ Info</button>
                </div>
                <div className="carta">
                    <h3>Programador Full-Stack</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero corporis incidunt saepe qui commodi quasi neque veniam quam, aspernatur est beatae maxime animi sed reiciendis mollitia ducimus veritatis repellendus?</p>
                    <button>+ Info</button>
                </div>
                <div className="carta">
                    <h3>Programador Python</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero corporis incidunt saepe qui commodi quasi neque veniam quam, aspernatur est beatae maxime animi sed reiciendis mollitia ducimus veritatis repellendus?</p>
                    <button>+ Info</button>
                </div>  
            </div>
        </div>
    </section> 
 */}


        </>
    )
}

export default Products;