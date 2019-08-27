/* global SELECTOR */

import './style.css'

export default {

	data: () => ({zoom: null, textTimeout: null}),

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
			copyElement.className = `code-copy ${ ALIGN }`
			copyElement.title = 'Click to Copy to Clipboard'
			copyElement.addEventListener( 'click', () => {
				this.copyToClipboard( parent.innerText )
				this.generateCopyText( parent )
			} )
			parent.appendChild( copyElement )
			parent.classList.add( 'codecopy-enabled' )
		},
		generateCopyText: function( parent ) {
			clearTimeout( this.textTimeout )

			const textElement = document.createElement( 'span' )
			textElement.className = `copy-text ${ ALIGN }`
			textElement.innerHTML = 'Copied'

			parent.appendChild( textElement )

			this.textTimeout = setTimeout(() => {
				parent.removeChild( textElement )
			}, 1000)
		},
		copyToClipboard: function( str ) {
			const el = document.createElement( 'textarea' )
			el.value = str
			el.setAttribute( 'readonly', '' )
			el.style.position = 'absolute'
			el.style.left = '-9999px'
			document.body.appendChild( el )
			const selected =
				document.getSelection().rangeCount > 0
					? document.getSelection().getRangeAt( 0 )
					: false
			el.select()
			document.execCommand( 'copy' )
			document.body.removeChild( el )
			if ( selected ) {
				document.getSelection().removeAllRanges()
				document.getSelection().addRange( selected )
			}
		}
	}
}
