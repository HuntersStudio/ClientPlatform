(function() {

  const dataPaymentMethods = {
    labels: ['Paypal', 'Tarjeta de Crédito', 'Transferencias'],
    datasets: [{
      data: [40, 30, 30],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  const dataPlatformRevenue = {
    labels: ['Epic Games', 'Steam', 'Itch.io'],
    datasets: [{
      data: [50, 40, 10],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  const dataUserAges = {
    labels: ['18 - 25', '26 - 40', '40 >'],
    datasets: [{
      data: [30, 50, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  const dataUserReviews = {
    labels: ['1 - 4 Estrellas', '5 - 7 Estrellas', '8 - 10 Estrellas'],
    datasets: [{
      data: [10, 20, 70],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  const config = {
    type: 'pie',
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    }
  };

  const ctxPaymentMethods = document.getElementById('payment-methods').getContext('2d');
  new Chart(ctxPaymentMethods, {
    ...config,
    data: dataPaymentMethods
  });

  const ctxPlatformRevenue = document.getElementById('platform-revenue').getContext('2d');
  new Chart(ctxPlatformRevenue, {
    ...config,
    data: dataPlatformRevenue
  });

  const ctxUserAges = document.getElementById('user-ages').getContext('2d');
  new Chart(ctxUserAges, {
    ...config,
    data: dataUserAges
  });

  const ctxUserReviews = document.getElementById('user-reviews').getContext('2d');
  new Chart(ctxUserReviews, {
    ...config,
    data: dataUserReviews
  });
})();