/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { BaseControl } from '@wordpress/components';
import { BlockPreview } from '@wordpress/block-editor';

/**
 * Renders the block preview content for the template.
 * It the templates blocks are not ready yet or not exist,
 * it tries to render a static image, or simply return null.
 *
 * @param {string} preview     Image URL for the static preview.
 * @param {string} previewAlt  Alt text to for the <img />
 * @param {array}  blocks      Parsed blocks to dynamic preview.
 * @return {null|*}            Preview block component.
 */
function renderBlockPreview( { preview, previewAlt, blocks } ) {
	if ( ! blocks || ! blocks.length ) {
		if ( ! preview ) {
			return null;
		}

		return (
			<img className="template-selector-control__media" src={ preview } alt={ previewAlt || '' } />
		);
	}

	return <BlockPreview blocks={ blocks } viewportWidth={ 1024 } />;
}

function TemplateSelectorControl( {
	label,
	className,
	help,
	instanceId,
	onClick,
	templates = [],
} ) {
	if ( isEmpty( templates ) ) {
		return null;
	}

	const id = `template-selector-control-${ instanceId }`;
	const handleButtonClick = event => onClick( event.target.value );

	return (
		<BaseControl
			label={ label }
			id={ id }
			help={ help }
			className={ classnames( className, 'template-selector-control' ) }
		>
			<ul className="template-selector-control__options">
				{ templates.map( option => (
					<li key={ `${ id }-${ option.value }` } className="template-selector-control__option">
						<button
							type="button"
							id={ `${ id }-${ option.value }` }
							className="template-selector-control__label"
							value={ option.value }
							onClick={ handleButtonClick }
							aria-describedby={ help ? `${ id }__help` : undefined }
						>
							<div className="template-selector-control__media-wrap">
								{ renderBlockPreview( option ) }
							</div>
							{ option.label }
						</button>
					</li>
				) ) }
			</ul>
		</BaseControl>
	);
}

export default withInstanceId( TemplateSelectorControl );
