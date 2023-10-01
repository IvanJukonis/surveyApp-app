import { useEffect } from 'react';

function TestBacks() {
  //const dispatch = useDispatch();
  //const testBacks = useSelector((state) => state.testBack.list);

  useEffect(() => {
    //getAllTestBacks(dispatch);
  }, []);

  return (
    <section>
      <p> ESTE ES EL OCURRENCE LOCATION </p>
    </section>
  );
}
export default TestBacks;
