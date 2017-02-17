import { WidgetBase } from '../../src/WidgetBase';
import { WidgetProperties } from '../../src/interfaces';
import { ProjectorMixin } from '../../src/mixins/Projector';
import { v, w } from '../../src/d';
import Widget1 from './Widget1';

export class App extends WidgetBase<WidgetProperties> {
	render() {
		return v('div', [
			w(Widget1, {
				key: 'widget1'
			})
		]);
	}
}

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
