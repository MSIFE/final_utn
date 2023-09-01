import React from 'react';

const GalleryItem = (props) => {
    const { titulo, info, precio, imagen, body } = props;

    return (
        <>
        <section id="nuestros-programas">

        <div className="container">
            <div className="carta">
            <h1>{titulo}</h1>
            <h3>{info}</h3>
            <img src={imagen} />
            <p>{precio}</p>

            </div>
            <div dangerouslySetInnerHTML={{ __html: body }}></div>
            <hr />
        </div>
        </section>
        </>
    );
}

export default GalleryItem;
