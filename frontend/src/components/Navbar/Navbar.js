import './style.css'

const Navbar = () => {
    const idNavbar = localStorage.getItem('token')
    console.log(idNavbar)

	function Sair() {
		localStorage.removeItem('token')
	}

	const UserMenu = () => {
		if (idNavbar == null) {
			return (
				<div className='menu'>
                    <h4><a href="/">Início</a></h4>
                    <h4><a href="/">Lotes</a></h4>
                    <h4><a href="/">Casas</a></h4>
                    <div className='login-menu'>
                        <h4><a href="/login">Entrar</a></h4>
                        <h4><a href="/signup">Cadastrar</a></h4>
                    </div>
                </div>
			);
		} else {
			return (
				<div className='menu'>
                    <h4><a href="/">Início</a></h4>
                    <h4><a href="/">Lotes</a></h4>
                    <h4><a href="/">Casas</a></h4>
                    <div className='login-menu'>
                        <label htmlFor="touch"><h4>Olá</h4></label>               
                        <input type="checkbox" id="touch" />
                        <ul className="slide">
                            <li><a href="/adicionar-lote">Adicionar lote</a></li> 
                            <li><a href="/adicionar-casa">Adicionar casa</a></li>
                            <li><a href="/" onClick={() => Sair()}>Sair</a></li>
                        </ul>
                    </div>
                </div>
			);
		}
	};

	return (
		<nav id='navigation'>
            {UserMenu()}
        </nav>
	);
};

export default Navbar;