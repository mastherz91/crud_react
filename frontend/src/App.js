import { useState, useEffect } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { heroService } from "./service/heroService";
import { InputText } from 'primereact/inputtext';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    heroService.getHerosData().then((data) => setProducts(data));
  }, []);

  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;
    
    console.log(newData);
    heroService.editHerosData(newData).then((data) => setProducts(_products));
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const allowEdit = (rowData) => {
    return true;
};
  return (
    <div className="text-center">
      <div className="card">
        <DataTable
          value={products}
          tableStyle={{ minWidth: "50rem" }}
          editMode="row"
          onRowEditComplete={onRowEditComplete}
        >
          <Column
            field="name"
            header="Name"
            editor={(options) => textEditor(options)}
          ></Column>
          <Column field="publisher_id" header="Casa Publicadora"></Column>
          <Column field="gender_id" header="Género"></Column>
          <Column field="height" header="Altura"></Column>
          <Column field="weight" header="Peso"></Column>
          <Column
            rowEditor={allowEdit}
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default App;
