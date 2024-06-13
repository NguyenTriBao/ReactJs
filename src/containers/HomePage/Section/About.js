import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './About.scss'


class About extends Component {


    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/H3ItkQfbQj8" title="[Chia sẻ] Full source code Website đặt lịch khám bệnh | Express và MySQL | Clone Bookingcare.vn" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Có bệnh thì vái tứ phương. Nhiều bệnh nhân than phiền rằng, bệnh tật đã đi khám nhiều nơi, gặp nhiều thầy thuốc, chữa nhiều phương án rồi mà không khỏi. Một trong những lý do quan trọng là do chưa gặp đúng bác sĩ giỏi với bệnh tật của mình. Gây mất nhiều thời gian chạy chữa, tốn kém tiền của và công sức. Nhiều người chán nản không muốn tiếp tục thăm khám hoặc đành nghe theo lời khuyên của những người xung quanh mà chưa chắc đã hiệu quả với mình.

Với mong muốn giúp bệnh nhân được gặp đúng bác sĩ giỏi với bệnh tật của mình, chúng tôi sắp xếp hệ thống chuyên khoa, giới thiệu thông tin bác sĩ đã được xác thực rõ ràng, uy tín, biên tập nội dung cẩm nang dễ hiểu, cùng với sự hỗ trợ của hệ thống, để giúp bệnh nhân hiểu rõ vấn đề của mình, đặt lịch đúng bác sĩ chuyên khoa giỏi. 

Ngoài ra, hệ thống thường xuyên ghi nhận ý kiến đánh giá phản hồi của bệnh nhân sau khi đi khám và phương án điều trị của bác sĩ. Từ đó, chúng tôi hiểu thêm về thế mạnh chuyên môn của từng bác sĩ để kết nối đúng bệnh nhân.

Hệ thống giúp bệnh nhân được gặp đúng bác sĩ chuyên khoa giỏi với căn bệnh của mình, đảm bảo “đúng người, đúng bệnh”. Qua đó, tiết kiệm thời gian, chi phí, góp phần nâng cao hiệu quả khám chữa bệnh.

</p>
                    </div>
                </div>
            </div>
        );
    }
    ƒ
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
