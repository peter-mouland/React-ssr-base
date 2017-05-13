import debug from 'debug';

const log = debug('footy:fetchComponentData');

export default function fetchComponentData(dispatch, components, params) {
  const componentsWithNeeds = [];
  const needs = components.reduce((prev, current) => {
    const wrapper = current.WrappedComponent;
    if (current.needs) {
      componentsWithNeeds.push(wrapper ? wrapper.name : current.name);
    }
    return current ? (current.needs || []).concat(prev) : prev;
  }, []);
  log('componentsWithNeeds', componentsWithNeeds);
  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}
