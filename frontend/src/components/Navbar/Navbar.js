import './style.css'

const Navbar = () => {
    const idNavbar = localStorage.getItem('token')
    const user = localStorage.getItem('username')

	function Sair() {
		localStorage.removeItem('token')
	}

    const outsideClick = (element, events, callback) => {
        const html = document.documentElement;
        const outside = 'data-outside'
        if(!element.hasAttribute(outside)) {
          events.forEach(userEvent => {
            setTimeout(() => html.addEventListener(userEvent, handleOutsideClick))
          })
          element.setAttribute(outside, '')
        }
        function handleOutsideClick(event) {
          if(!element.contains(event.target)){
            element.removeAttribute(outside)
            events.forEach(userEvent => {
              html.removeEventListener(userEvent, handleOutsideClick)
            })
            callback();
          }
        }
      }

    const initDropDownMenu = () => {
        const dropdownMenus = document.querySelectorAll('.dropdown');
        
        dropdownMenus.forEach(menu => {
            ['click'].forEach(userEvent => {
            menu.addEventListener(userEvent, handleClick)
            })
        })
        
        function handleClick() {
            this.classList.add('active')
            outsideClick(this, ['click'], () => {
            this.classList.remove('active')
            })
        }
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
			)
		} else {
			return (
				<div className='menu'>
            <h4><a href="/">Início</a></h4>
            <h4><a href="/">Lotes</a></h4>
            <h4><a href="/">Casas</a></h4>
            <div className='login-menu'>
                <li className="dropdown">
                    <h4 onClick={() => initDropDownMenu()}>Olá, {user}</h4>
                    <ul className="dropdown-menu">
                        <li><a href="/adicionar-lote">Adicionar lote</a></li> 
                        <li><a href="/adicionar-casa">Adicionar casa</a></li>
                        <li><a href="/" onClick={() => Sair()}>Sair</a></li>
                    </ul>
                </li>
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