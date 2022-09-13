import React from 'react';
import Gallery from 'react-grid-gallery';
import football from "../../assets/football.jpg";
import kids from "../../assets/kids.jpg";
import kids2 from "../../assets/kids2.jpg";
import men from "../../assets/men.jpg";
import party from "../../assets/party.jpg";

const IMAGES =
[{
        src: football,
        thumbnail: football,
        thumbnailWidth: 320,
        thumbnailHeight: 184,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: kids,
        thumbnail: kids,
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: kids,
        thumbnail: kids,
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: kids,
        thumbnail: kids,
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: men,
        thumbnail: men,
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: party,
        thumbnail: party,
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: party,
        thumbnail: party,
        caption: "Boats (Jeshu John - designerspics.com)"
},
{
        src: kids2,
        thumbnail: kids2,
        caption: "After Rain (Jeshu John - designerspics.com)"
}]

function Gallerry(props) {
  
  function thumbnailStyleFn() {
    return {
         borderRadius: 15,
         height: '100%',
         width: '100%',
         flexDirection: 'row',
         overflow: "hidden"
     };
  }
  return (
    <div>
      <Gallery
        enableImageSelection={false}
        enableLightbox={true}
        thumbnailStyle={thumbnailStyleFn}
        // lightboxWidth={1536}
        images={IMAGES}
      />
    </div>
  );
}


export default Gallerry;
