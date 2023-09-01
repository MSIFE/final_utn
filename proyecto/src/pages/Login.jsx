import '../style/components/layout/Layout.css';

import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {

    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true)
        const response = await axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.message);
        if (response.data.error === false) {
            setFormData(initialForm)
        }
    }

    return (
        <>
            <div className="container mt-5">
                <form action="/contacto" className='formulario' method="post" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label >Nombre:</label>
                        <input className="form-control" type="text" value={formData.nombre} onChange={handleChange} name="nombre" required /><br />
                    </div>

                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <input className="form-control" type="text" value={formData.email} onChange={handleChange} name="email" required /><br />
                    </div>
                    <div className="form-group">
                        <label>Telefono:</label>
                        <input className="form-control" type="text" value={formData.telefono} onChange={handleChange} name="telefono" required /><br />
                    </div>
                    <div className="form-group">
                        <label >Mensaje:</label><br />
                        <textarea id="mensaje" value={formData.mensaje} onChange={handleChange} name="mensaje" rows="4" cols="50" required></textarea><br />
                    </div>

                    <input className="btn btn-secondary" type="submit" value="Enviar Correo" />
                </form>

                {sending ? <p>Enviado...</p> : null}
                {msg ? <p>{msg} </p> : null}
            </div>
        </>
    )
}

export default Login;