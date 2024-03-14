import Image from "next/image";
import styles from "../styles/terminology.module.css";
import { promises as fs } from 'fs';
import path from 'path';

import Toc from '../components/terminology-toc.js';

export const metadata = {
  title: "Terminology",
  description: "Generated by create next app",
};

async function getData() {
  const filePath = path.join(process.cwd(), '/src/app/terminology.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  
  return data
}

function Images({images}) {
  return(
    images.map((image)=> {
      return(
        <div className={styles.imageWrapper} key={image.name}>
          <Image src={`/images/${image.name}`} alt={image.alt} height={image.height} width={image.width}/>
          {image.caption.trim().length > 0 && <span aria-hidden="true" style={{maxWidth: `${image.width}px`}}>{image.caption}</span>}
        </div>
      )
    })
  )
}

function Terms({values}) {
  return(
    values.map((value)=> {
      const headingId = value.title.toLowerCase().replaceAll(' ', '-').replace('(', '').replace(')', '');
      return(
        <article key={headingId}>
          <h3 id={headingId}>{value.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: value.text }} />
          {
            value.images.length > 0 && <Images images={value.images} />
          }
      </article>
      )
    })
  )
}

export default async function Terminology() {
  const data = await getData()

  return (

      <main className={styles.main}>
      <h1>Terminology</h1>
      <div className={styles.terminologyWrapper}>

          <Toc data={data} />

        <div className={styles.contentWrapper}>
        {
            Object.keys(data).map(letter => {
              if(data[letter].length > 0) {
                return(
                  <section key={letter}>
                    <h2>{letter.toUpperCase()}</h2>
                    <Terms values={data[letter]} />
                  </section>
                )
              }
            })
        }
        </div>
      </div>
    </main>
  );
}
