import React from 'react';
import Link from 'next/link';

const ErrorContent = () => {
    return (
        <>
            <section class="error-page">
				<div class="container">
					<div class="row">
						<div class="col-xl-12">
							<div class="error-page__wrapper text-center">
								<div class="error-page__content">
									<h2>404</h2>
									<h3>Oops! Halaman tidak ditemukan</h3>
									<p>Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.</p>
									<div class="btn-box">
										<Link href="/" class="thm-btn">
											<span>Kembali ke Beranda</span>
											<div class="liquid"></div>
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
