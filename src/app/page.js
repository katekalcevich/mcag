import styles from "./styles/page.module.css";
import { promises as fs } from 'fs';
import path from 'path';

import Toc from './components/guidelines-toc.js';
import Guidelines from './components/guidelines.js';

export const metadata = {
  title: "Mobile Content Accessibility Guidelines (MCAG)",
  description: "",
};

async function getData() {
  const filePath = path.join(process.cwd(), '/src/app/mcag.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  
  return data
}

export default async function Home() {
  const data = await getData();
  return (
      <main className={styles.main}>
        <h1>Mobile Content Accessibility Guidelines (MCAG)</h1>
        <div className={styles.guidelinesWrapper}>
          
           <Toc data={data} />

          <div className={styles.contentWrapper}>
          {
              data.principles.map((principle)=> {
                  return (
                    <section id={principle.name} tabIndex="-1" key={principle.name}>
                      <h2 id={`heading-${principle.name}`}>{`${principle.num}. ${principle.handle}`}</h2>
                      <p dangerouslySetInnerHTML={{ __html: principle.title }} />
                      <Guidelines guidelines={principle.guidelines} />
                    </section>
                  )
              })
          }
          </div>
        </div>
      </main>
  );
}
