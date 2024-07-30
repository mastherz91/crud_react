import { useState, useEffect } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { heroService } from './service/heroService';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    heroService.getHerosData().then(data => setProducts(data));
  }, []);

  return (
    <div className="text-center">
      <div className="card">
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="name" header="Name"></Column>
          <Column field="gender_id" header="Género"></Column>
          <Column field="height" header="Altura"></Column>
          <Column field="weight" header="Peso"></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default App;
