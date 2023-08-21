export default {
  mounted(el, binding){
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (enteries, observer) => {
      if (enteries[0].isIntersecting)  {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name :'intersection'
}