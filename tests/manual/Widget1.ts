import { WidgetBase } from '../../src/WidgetBase';
import { WidgetProperties, DNode } from '../../src/interfaces';
import { v, isHNode } from '../../src/d';
import { before } from '@dojo/core/aspect';
import { ProjectionOptions, VNodeProperties, VNode } from '@dojo/interfaces/vdom';

class DecoratorWidgetBase extends WidgetBase<WidgetProperties> {

	public renderDecoratorDNodeChanges(node: DNode): DNode {
		this.aspectDNodeEvents(node);
		return node;
	}

	protected elementCreated(element: Element, key: string): void {
		// Do nothing;
	}

	protected elementUpdated(element: Element, key: string): void {
		// Do nothing
	}

	private aspectDNodeEvents(node: DNode): void {
		if (!isHNode(node)) {
			return;
		}

		before(node.properties, 'afterCreate', this.nodeChange.bind(this, 'elementCreated'));
		before(node.properties, 'afterUpdate', this.nodeChange.bind(this, 'elementUpdated'));

		const children = node.children;
		if (children) {
			for (let i in children) {
				this.aspectDNodeEvents(children[i]);
			}
		}
	}

	private nodeChange(type: string, element: Element, projectionOptions: ProjectionOptions, vnodeSelector: string,
					   properties: VNodeProperties): void {
		(<any>this)[type].call(this, element, properties && properties.key);
	}
}

export default class Widget1 extends DecoratorWidgetBase {
	private afterCreate(element: Element, projectionOptions: ProjectionOptions, vnodeSelector: string,
						properties: VNodeProperties, children: VNode[]): void {
		console.log('DNode ', properties.key, ' : ', this, element, projectionOptions, vnodeSelector, properties,
			children);
	}

	elementCreated(element: Element, key: string): void {
		console.log('elementCreated : ', key, element);
	}

	elementUpdated(element: Element, key: string): void {
		console.log('elementUpdated : ', key, element);
	}

	render() {
		return v('div', {
				key: 'div1',
				afterCreate: this.afterCreate
			}, [
				v('div', {
					key: 'div2',
					afterCreate: this.afterCreate
				}, ['Hello world!!!##'])
			]
		);
	}
}
