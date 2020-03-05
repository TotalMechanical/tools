import React from 'react';

import base from '../helpers/data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getLocal } from '../helpers/localStorage';

export default function Tools() {
  const foreman = getLocal('foreman');
  const [data, setData] = useLocalStorage('data', {});
  const [specialty, setSpecialty] = useLocalStorage('specialty', {});

  React.useEffect(() => {
    const fetch = async () => {
      // Fetch Assigned tools from Tools table
      const res = await base('Tools')
        .select({
          view: 'API',
          filterByFormula: `({Assigned To} = '${foreman.Name}')`
        })
        .all();
      // Fetch all the tools from Specialty table
      const spec = await base('Specialty')
        .select({
          view: 'API'
        })
        .all();

      const fetched = Date.now();

      const tools = res.map(el => ({
        id: el.id,
        ...el.fields
      }));

      console.log('tools ···', tools);
      setData({ ...data, fetched: fetched, tools: tools });

      const specialty = spec.map(el => ({
        id: el.id,
        ...el.fields
      }));

      console.log('specialty ···', specialty);
      setSpecialty({ fetched: fetched, list: specialty });
    };
    if (!data.fetched || Date.now() - data.fetched > 900000) fetch();
  }, []);

  return data && data.tools ? (
    <>
      <section className="tools">
        {data.tools.map(rec => (
          <div className="record" key={rec.id}>
            <p>{rec['Name']}</p>
            {/* <p>{rec['Type']}</p>
              <p>{rec['Tool ID']}</p> */}
            <p>{rec['Description']}</p>
            <p>{rec['Status']}</p>
            <a
              href={`mailto:anonaddy@bx.anonaddy.me?subject=Report Broken/Lost Tool&body=Notes:%0D%0A%0D%0A%0D%0A%0D%0A— — — — — — — —%0D%0A%0D%0ATool Type: ${rec.Type}%0D%0A%0D%0ASerial #: ${rec.Serial}%0D%0A%0D%0ATool ID: ${rec['Tool ID']}%0D%0A%0D%0AManufacturer: ${rec.Manufacturer}%0D%0A%0D%0ADescription: ${rec.Description}%0D%0A%0D%0AModel: ${rec.Model}`}
            >
              <span role="img" aria-label="yellow warning sign">
                ⚠️
              </span>{' '}
            </a>
          </div>
        ))}
      </section>
    </>
  ) : (
    <h3>Loading...</h3>
  );
}
