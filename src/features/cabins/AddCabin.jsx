import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens="cabin-table">
          <Button>Show Cabin table</Button>
        </Modal.Open>
        <Modal.Window name="cabin-table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddCabin;