import React from 'react';
import Link from 'next/link';

const ErrorContent = () => {
    return (
        <>
            <section className="error-page">
				<div className="container">
					<div className="row">
						<div className="col-xl-12">
							<div className="error-page__wrapper text-center">
								<div className="error-page__content">
									<h2>404</h2>
									<h3>Oops! Halaman tidak ditemukan</h3>
									<p>Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.</p>
									<div className="btn-box">
										<Link href="/" className="thm-btn">
											<span>Kembali ke Beranda</span>
											<div className="liquid"></div>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
        </>
    )
}

export default ErrorContent;
