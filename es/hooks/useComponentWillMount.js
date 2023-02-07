import { useRef } from 'react';

export var useComponentWillMount = function useComponentWillMount(callback) {
  var willMount = useRef(true);

  if (willMount.current) callback();

  willMount.current = false;
};