export default {

  section: section => section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

};