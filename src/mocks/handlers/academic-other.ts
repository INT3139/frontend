import { HttpResponse, delay, http } from 'msw';

const mockAcademicOtherData = {
  content:
    'Tham gia Hiệp hội Kỹ sư Điện và Điện tử (IEEE).\nThành viên Ban biên tập Tạp chí Khoa học máy tính.',
  trangThai: 'pending',
};

export const handlers = [
  http.get('/api/academic-other', async () => {
    await delay(500);
    return HttpResponse.json(mockAcademicOtherData);
  }),

  http.put('/api/academic-other', async ({ request }) => {
    await delay(800);
    const data = (await request.json()) as { content: string };
    mockAcademicOtherData.content = data.content;
    mockAcademicOtherData.trangThai = 'pending'; // reset status to pending when updated
    return HttpResponse.json({
      message: 'Cập nhật thành công',
      data: mockAcademicOtherData,
    });
  }),
];
