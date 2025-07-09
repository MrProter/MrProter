const sendEvent = (event) => {
    console.log('sendEvent - event', event)
    const path = window.location.pathname;
    if (path === '/') {
        dataLayer.push({'event': 'SendForm_HomeСleaning'})
    }

    if (path.includes('b2b-uborka-ofisov')) {
        dataLayer.push({'event': 'SendForm_OfficeСleaning'})
    }
}

