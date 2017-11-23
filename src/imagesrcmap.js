const getImagePath = (cardName) => {
	switch(cardName) {
	    case "Urchin Slingshotter":
	    	return require('./images/urchin.png');
	        break;
	    case "Arcane Explosion":
	    	return require('./images/arcane-explosion.jpg');
	        break;
	    case "Rabid Troll":
	    	return require('./images/rabidtroll.jpg');
	        break;
	    case "Obese Horror":
	    	return require('./images/horror.jpg');
	        break;
	    case "Noob Mage":
	    	return require('./images/noobmage.jpg');
	        break;
	    case "Smoke Screen":
	    	return require('./images/smoke.jpg');
	        break;
	    case "Cute Spiderling":
	    	return require('./images/spiderling.jpg');
	        break;
	    case "Arcane Menagerie":
	    	return require('./images/menagerie.jpg');
	        break;
	    case "Lava Strike":
	    	return require('./images/lava.jpg');
	        break;
	    case "Prescient Vision":
	    	return require('./images/prescient.jpg');
	        break;
	    case "Clone":
	    	return require('./images/clone.jpg');
	        break;
	    case "Troll Headhunter":
	    	return require('./images/trollheadhunter.png');
	        break;
	    case "Bone Mage":
	    	return require('./images/bonemage.jpg');
	        break;

	    default:
	        return;
	}
}

export default getImagePath;