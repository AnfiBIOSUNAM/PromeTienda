import Swal from 'sweetalert2'

export function Error(msj){
    return Swal.fire({
        position:"top-end",
        icon: "error",
        title: msj,
        showConfirmButton: false,
        timer: 1500
    })
}

export function Success(msj){
    return Swal.fire({
            position:"top-end",
            icon: "success",
            title: msj,
            showConfirmButton: false,
            timer: 1500
        })
}

export function Confirm(msj){
    return Swal.fire({
            title: msj,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            showConfirmButton: false
        })
}

export function Alert(msj){
    return Swal.fire({
            position:"top-end",
            icon: "warning",
            title: msj,
            showConfirmButton: false,
            timer: 1500
        })
}

Swal.fire({
  title: 'Do you want to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Yes',
  denyButtonText: 'No',
  customClass: {
    actions: 'my-actions',
    cancelButton: 'order-1 right-gap',
    confirmButton: 'order-2',
    denyButton: 'order-3',
  },
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Saved!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})