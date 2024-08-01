import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { heroService } from "./service/heroService";
import { publisherService } from "./service/publisherService";
import { InputText } from "primereact/inputtext";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

function App() {
  let emptyHero = {
    hero_id: 0,
    name: "",
    eye_color: "",
    hair_color: "",
    skin_color: null,
    height: 0,
    weight: 0,
    race: "",
    publisher_id: 0,
    gender_id: 0,
    alignment_id: 0,
  };

  const [heroes, setheroes] = useState([]);
  const [heroe, setheroe] = useState(emptyHero);
  const [heroeDialog, setheroeDialog] = useState(false);
  const [deleteheroeDialog, setDeleteheroeDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const [publishers, setpublishers] = useState([]);

  useEffect(() => {
    publisherService
      .getPublisherData()
      .then((response_data) => setpublishers(response_data));
    heroService
      .getHerosData()
      .then((response_data) => setheroes(response_data));
  }, []);

  //

  //Nuevo heroeo
  const openNew = () => {
    setheroe(emptyHero);
    setSubmitted(false);
    setheroeDialog(true);
  };
  // Dialog -----
  const hideDialog = () => {
    setSubmitted(false);
    setheroeDialog(false);
  };

  const hideDeleteheroeDialog = () => {
    setDeleteheroeDialog(false);
  };

  // Guardar Nuevo heroe
  const saveheroe = () => {
    setSubmitted(true);

    if (heroe.name.trim()) {
      let _heroes = [...heroes];
      let _heroe = { ...heroe };

      //si el heroe existe
      if (heroe._id) {
        const index = findIndexById(heroe._id);

        _heroes[index] = _heroe;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "heroe Updated",
          life: 3000,
        });
        heroService.editHerosData(heroe);
      } else {
        _heroe.hero_id = createId();
        _heroes.push(_heroe);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "heroe Created",
          life: 3000,
        });
        heroService.createHerosData(heroe);
      }

      setheroes(_heroes);
      setheroeDialog(false);
      setheroe(emptyHero);
    }
  };

  // Opcion Lapiz de Editar
  const editheroe = (heroe) => {
    setheroe({ ...heroe });
    setheroeDialog(true);
  };

  // Opcion de Delete -----------------

  const confirmDeleteheroe = (heroe) => {
    setheroe(heroe);
    setDeleteheroeDialog(true);
  };

  const deleteheroe = () => {
    let _heroes = heroes.filter((_heroe) => _heroe._id !== heroe._id);

    setheroes(_heroes);
    setDeleteheroeDialog(false);
    heroService.deletHerosData(heroe);
    setheroe(emptyHero);

    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "heroe Deleted",
      life: 3000,
    });
  };

  // Find IndexBy
  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < heroes.length; i++) {
      if (heroes[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  // Crear Id de heroeo

  const createId = () => {
    let id = "";
    let chars = "0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return parseInt(id);
  };
  //
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editheroe(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteheroe(rowData)}
        />
      </React.Fragment>
    );
  };

  // Heder busqueda
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Listado de Heroes</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );
  // Dialog Eliminar
  const heroeDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveheroe} />
    </React.Fragment>
  );

  const deleteheroeDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteheroeDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteheroe}
      />
    </React.Fragment>
  );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _heroe = { ...heroe };

    _heroe[`${name}`] = val;

    setheroe(_heroe);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _heroe = { ...heroe };

    _heroe[`${name}`] = val;

    setheroe(_heroe);
  };

  const genderBody = (hero) => {
    return hero.gender_id == 1 ? "Female" : "Male";
  };

  const publisherBody = (hero) => {
    const publisher = publishers.find(
      (publisher) => publisher.publiser_id == hero.publiser_id
    );
    return publisher ? publisher.publisher_name : hero.publiser_id;
  };

  return (
    <div className="text-center">
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

        <DataTable
          value={heroes}
          //tableStyle={{ minWidth: "50rem" }}
          //editMode="row"
          //onRowEditComplete={}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} heroes"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="name"
            header="Name"
            //selectionMode="multiple"
            //editor={(options) => textEditor(options)}
          ></Column>

          <Column
            field="publisher_id"
            header="Casa Publicadora"
            body={publisherBody}
          ></Column>
          <Column field="gender_id" header="Género" body={genderBody}></Column>
          <Column field="height" header="Altura"></Column>
          <Column field="weight" header="Peso"></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deleteheroeDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteheroeDialogFooter}
        onHide={hideDeleteheroeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {heroe && (
            <span>
              Are you sure you want to delete <b>{heroe.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={heroeDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="heroe Details"
        modal
        className="p-fluid"
        footer={heroeDialogFooter}
        onHide={hideDialog}
      >
        {heroe.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/heroe/${heroe.image}`}
            alt={heroe.image}
            className="heroe-image block m-auto pb-3"
          />
        )}
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Nombre
          </label>
          <InputText
            id="name"
            value={heroe.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !heroe.name })}
          />
          {submitted && !heroe.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="publisher_id" className="font-bold">
            Casa Publicadora
          </label>
          <Dropdown
            id="publisher_id"
            value={heroe.publisher_id}
            onChange={(e) => onInputChange(e, "publisher_id")}
            options={publishers}
            optionLabel="publisher_name"
            optionValue="publisher_id"
          ></Dropdown>
        </div>

        <div className="field">
          <label htmlFor="gender_id" className="font-bold">
            Género
          </label>

          <Dropdown
            id="gender_id"
            value={heroe.gender_id}
            onChange={(e) => onInputChange(e, "gender_id")}
            options={[
              { value: 1, label: "Female" },
              { value: 2, label: "Male" },
            ]}
            optionLabel="label"
            optionValue="value"
          ></Dropdown>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="height" className="font-bold">
              Altura
            </label>
            <InputNumber
              id="height"
              value={heroe.height}
              onValueChange={(e) => onInputNumberChange(e, "height")}
            />
          </div>
          <div className="field col">
            <label htmlFor="weight" className="font-bold">
              Peso
            </label>
            <InputNumber
              id="weight"
              value={heroe.weight}
              onValueChange={(e) => onInputNumberChange(e, "weight")}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default App;
