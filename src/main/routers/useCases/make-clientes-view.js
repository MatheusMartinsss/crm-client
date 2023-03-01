import { ClientesView } from "../../../presentation/views/clientes/clientes-view";
import UseClienteProvider from "../../../domain/context/cliente-context";

export const MakeClienteView = () => (
    <UseClienteProvider>
        <ClientesView />
    </UseClienteProvider>
)