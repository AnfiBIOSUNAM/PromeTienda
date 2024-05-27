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
