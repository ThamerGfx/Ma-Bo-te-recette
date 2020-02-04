import React from 'react';

class Connexion extends React.Component {

	/*constructor(props) {
		super(props);
		  this.state = {
			pseudo: ''
		  }
	}*/

	goToApp = (event) => {
		const pseudo = this.inputBox.value;
		event.preventDefault();
		console.log(pseudo);
		// changer d'url
		//this.context.router.transitionTo(`/box/${pseudo}`);
		this.props.history.push(`/box/${pseudo}`);
	}

	render() {
		return (
			<div className="connexionBox">
				<form 
					className="connexion" 
					onSubmit={(e) => this.goToApp(e)}
				>
					<h1>Ma Boite</h1>
					<input 
						type="text" 
						placeholder="Nom du Chef" 
						pattern="[A-Za-z-]{1,}" 
						required
						ref = { (input) => this.inputBox = input }
					/>
					<button type="submit">GO</button>
				</form>
			</div>
		)
	}
}

export default Connexion;