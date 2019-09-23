/* global SELECTOR */

import './style.css'

export default {

	data: () => ({zoom: null}),

	mounted() {
		this.updateCopy()
	},

	updated() {
		this.updateCopy()
	},

	methods: {
		updateCopy() {
			setTimeout( () => {
				document.querySelectorAll( COPY_SELECTOR ).forEach( this.generateCopyButton )
			}, 1000 )
		},
		generateCopyButton: function( parent ) {
			if ( parent.classList.contains( 'codecopy-enabled' ) ) return
			const copyElement = document.createElement( 'span' )
			copyElement.className = 'code-copy'
			copyElement.title = 'Click to Copy to Clipboard'
			copyElement.addEventListener( 'click', () => {
				this.copyToClipboard( parent.innerText, copyElement )
			} )
			parent.appendChild( copyElement )
			parent.classList.add( 'codecopy-enabled' )
		},
		copyToClipboard: function( str, copyElement ) {
			navigator.clipboard.writeText(str)
				.then(() => {
					copyElement.classList.add( '_suc' );
					console.log('success');
				})
				.catch(() => {
					copyElement.classList.add( '_err' );
					console.log('error');
				});
		}
	}
}
