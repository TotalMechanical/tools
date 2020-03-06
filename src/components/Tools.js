import React from 'react';

// Helper Code + Custom Hooks
import base from '../helpers/data';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Components
import MySpecialtyList from './MySpecialtyList';
import ToolList from './ToolsList';

export default function Tools() {
  const foreman = JSON.parse(window.localStorage.getItem('foreman'));
  const [data, setData] = useLocalStorage('data', {});

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
        .select({ view: 'API' })
        .all();

      // Fetch this foreman's info from Foreman table
      const user = await base('Foreman').find(foreman.id);

      const fetched = Date.now();

      // Set the specialty tools data
      const specialtyTools = spec.map(el => ({ id: el.id, ...el.fields }));

      // Set the tools data
      const tools = res.map(el => ({ id: el.id, ...el.fields }));
      setData({
        ...data,
        fetched: fetched,
        foreman: {
          stats: user.fields,
          tools: tools,
          specialty: specialtyTools.filter(
            el => el['Assigned To'] && el['Assigned To'][0] === foreman.id
          )
        },
        specialty: specialtyTools
      });
    };
    // Will allow fetch if no data or it's been more than 30 sec since last fetch
    if (!data.fetched || Date.now() - data.fetched > 30000) fetch();
  }, [foreman, data, setData]);

  return data &&
    data.foreman &&
    data.foreman.specialty &&
    data.foreman.tools ? (
    <>
      {data.foreman.specialty.length > 0 && (
        <MySpecialtyList tools={data.foreman.specialty} />
      )}
      {data.foreman.tools.length > 0 && <ToolList tools={data.foreman.tools} />}
    </>
  ) : (
    <h3>Loading...</h3>
  );
}
