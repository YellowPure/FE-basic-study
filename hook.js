const effectstack = [];
function useState(value) {
  const subs = new Set();
  const getter = () => {
    const effect = effectstack[effectstack.length - 1];
    if (effect) {
      subscribe(effect, subs);
    }
    return value;
  };

  const setter = (nextValue) => {
    value = nextValue;
    for (const sub of [...subs]) {
      sub.execute();
    }
  };

  return [getter, setter];
}

function useEffect(callback) {
  const execute = () => {
    cleanup(effect);
    effectstack.push(effect);

    try {
      callback();
    } finally {
      effectstack.pop();
    }
  };
  const effect = {
    execute,
    deps: new Set(),
  };
  execute();
}

function useMemo(callback) {
  const [s, set] = useState();
  useEffect(() => set(callback()));
  return s;
}

function cleanup(effect) {
  for (const dep of effect.deps) {
    dep.delete(effect);
  }
  effect.deps.clear();
}

function subscribe(effect, subs) {
  subs.add(effect);

  effect.deps.add(subs);
}
const [name, setName] = useState('Sone');

const [name1, setName1] = useState('KaSong');
const [name2, setName2] = useState('XiaoMing');
const [showAll, triggerShowAll] = useState(true);

const whoIsHere = useMemo(() => {
  if (!showAll()) {
    return name1();
  }
  return `${name1()} 和 ${name2()}`;
});

useEffect(() => console.log('谁在那儿！', whoIsHere()));
setName1('KaKaSong');
triggerShowAll(false);
setName2('XiaoHong');
