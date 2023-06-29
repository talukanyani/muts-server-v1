const { Router } = require('express')

const router = Router()

router.get('/download', (req, res) => {
    const userAgent = req.get('user-agent')

    if (/Android/.test(userAgent)) {
        res.redirect('https://play.google.com/store/apps/details?id=com.muts.studentcalendar')
        //   } else if (/iPhone/.test(userAgent) || /iPad/.test(userAgent) || /iPod/.test(userAgent)) {
        //     res.redirect('TODO: app store link')
    } else {
        res.redirect('/student_calendar')
    }
})

module.exports = router
