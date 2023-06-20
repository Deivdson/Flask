import './style.css'

const Navbar = () => {

	return (
		<nav id='navigation'>
            <div className='menu'>
                <h4><a href="/">Início</a></h4>
                <h4><a href="/lotes">Lotes</a></h4>
                <h4><a href="/casas">Casas</a></h4>
                <div className='login-menu'>
                    <h4><a href="/login">Entrar</a></h4>
                    <h4><a href="/signup">Cadastrar</a></h4>
                </div>
            </div>
            
        </nav>
	);
};

export default Navbar;